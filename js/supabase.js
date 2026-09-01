/**
 * Cəsarətoğlu MMC — Supabase Cloud Database & Storage Client
 * Connects the web application and admin panel to Supabase PostgreSQL & Storage.
 * Provides fallback to LocalStorage if Supabase credentials are not yet configured.
 */

const SUPABASE_CONFIG = {
    url: 'https://betafmrutqiikjsgdcge.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGFmbXJ1dHFpaWtqc2dkY2dlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNzQ1MzgsImV4cCI6MjEwMzc1MDUzOH0.pzDnkB5yhTe28uhD_rAA63DT9FYGyal9hD6EJQ_hMn0',
    storageBucket: 'cesaretoglu_media'
};

class SupabaseService {
    constructor() {
        this.client = null;
        this.isConfigured = false;
        this.init();
    }

    init() {
        if (typeof window !== 'undefined' && window.supabase && SUPABASE_CONFIG.url && !SUPABASE_CONFIG.url.includes('YOUR_PROJECT_ID')) {
            try {
                this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
                this.isConfigured = true;
                console.log('⚡ Supabase Cloud Client Initialized successfully.');
            } catch (err) {
                console.warn('⚠️ Supabase initialization failed, running with local storage fallback:', err);
                this.isConfigured = false;
            }
        } else {
            console.log('ℹ️ Supabase credentials not set or placeholder used. Running in LocalStorage mode.');
            this.isConfigured = false;
        }
    }

    // =========================================================================
    // Generic Cloud Sync & Fetch
    // =========================================================================
    async fetchTable(tableName) {
        if (!this.isConfigured || !this.client) return null;
        try {
            const { data, error } = await this.client.from(tableName).select('*');
            if (error) {
                console.error(`Supabase fetch error on [${tableName}]:`, error);
                return null;
            }
            return data;
        } catch (e) {
            console.error(`Supabase query exception on [${tableName}]:`, e);
            return null;
        }
    }

    async upsertRecord(tableName, record) {
        if (!this.isConfigured || !this.client) return null;
        try {
            const { data, error } = await this.client.from(tableName).upsert(record).select();
            if (error) {
                console.error(`Supabase upsert error on [${tableName}]:`, error);
                return null;
            }
            return data;
        } catch (e) {
            console.error(`Supabase upsert exception on [${tableName}]:`, e);
            return null;
        }
    }

    async deleteRecord(tableName, id) {
        if (!this.isConfigured || !this.client) return false;
        try {
            const { error } = await this.client.from(tableName).delete().eq('id', id);
            if (error) {
                console.error(`Supabase delete error on [${tableName}]:`, error);
                return false;
            }
            return true;
        } catch (e) {
            console.error(`Supabase delete exception on [${tableName}]:`, e);
            return false;
        }
    }

    // =========================================================================
    // Client-Side Image Compression (Canvas)
    // =========================================================================
    async compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) {
        return new Promise((resolve, reject) => {
            // If not an image (e.g. PDF, SVG, etc.), return as is
            if (!file || !file.type || !file.type.startsWith('image/')) {
                return resolve(file);
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    // Proportional resize to fit max dimensions
                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to compressed JPEG blob
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                return resolve(file); // fallback to original if toBlob fails
                            }
                            const cleanName = file.name ? file.name.replace(/\.[^/.]+$/, "") + '.jpg' : 'image.jpg';
                            const compressedFile = new File([blob], cleanName, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            console.log(`🖼️ Сжато: ${(file.size / 1024 / 1024).toFixed(2)}MB ➡️ ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB (${width}x${height}px)`);
                            resolve(compressedFile);
                        },
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = () => resolve(file); // fallback to original
            };
            reader.onerror = () => resolve(file);
        });
    }

    // =========================================================================
    // Supabase Storage (Image Uploads)
    // =========================================================================
    async uploadImage(file, folder = 'uploads') {
        if (!this.isConfigured || !this.client) return null;
        try {
            // 1. Auto-compress heavy images on the client side before uploading
            const fileToUpload = await this.compressImage(file, 1200, 1200, 0.8);

            const fileExt = fileToUpload.name ? fileToUpload.name.split('.').pop() : 'jpg';
            const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            
            const { data, error } = await this.client.storage
                .from(SUPABASE_CONFIG.storageBucket)
                .upload(fileName, fileToUpload, { cacheControl: '3600', upsert: true });

            if (error) {
                console.error('Supabase Storage upload error:', error);
                return null;
            }

            const { data: publicUrlData } = this.client.storage
                .from(SUPABASE_CONFIG.storageBucket)
                .getPublicUrl(fileName);

            return publicUrlData ? publicUrlData.publicUrl : null;
        } catch (e) {
            console.error('Supabase upload exception:', e);
            return null;
        }
    }

    async deleteImageFromStorage(filePath) {
        if (!this.isConfigured || !this.client || !filePath) return false;
        try {
            const bucketName = SUPABASE_CONFIG.storageBucket || 'cesaretoglu_media';
            let path = filePath;

            // Extract relative storage path if full URL is passed
            if (filePath.includes('/')) {
                const parts = filePath.split('/');
                const bucketIndex = parts.indexOf(bucketName);
                if (bucketIndex !== -1) {
                    path = parts.slice(bucketIndex + 1).join('/');
                } else if (filePath.includes('supabase.co')) {
                    // Fallback for standard public URL pattern: .../object/public/bucketName/path
                    const publicIdx = parts.indexOf('public');
                    if (publicIdx !== -1 && parts[publicIdx + 1] === bucketName) {
                        path = parts.slice(publicIdx + 2).join('/');
                    }
                }
            }

            // Remove query params if any
            path = path.split('?')[0];

            // If it is a local path or placeholder like images/products/..., skip cloud storage deletion
            if (path.startsWith('images/') || path.startsWith('data:') || path.startsWith('blob:')) {
                return false;
            }

            const { data, error } = await this.client.storage
                .from(bucketName)
                .remove([path]);

            if (error) {
                console.error('Supabase Storage delete error:', error);
                return false;
            }
            console.log('✅ File successfully deleted from Supabase Storage:', path);
            return true;
        } catch (e) {
            console.error('Supabase Storage delete exception:', e);
            return false;
        }
    }
}

if (typeof window !== 'undefined') {
    window.supabaseService = new SupabaseService();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, SupabaseService };
}
