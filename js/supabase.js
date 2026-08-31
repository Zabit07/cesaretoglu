/**
 * Cəsarətoğlu MMC — Supabase Cloud Database & Storage Client
 * Connects the web application and admin panel to Supabase PostgreSQL & Storage.
 * Provides fallback to LocalStorage if Supabase credentials are not yet configured.
 */

const SUPABASE_CONFIG = {
    // Paste your Supabase Project URL and Anon/Public Key here
    url: 'https://YOUR_PROJECT_ID.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_PUBLIC_KEY',
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
    // Supabase Storage (Image Uploads)
    // =========================================================================
    async uploadImage(file, folder = 'uploads') {
        if (!this.isConfigured || !this.client) return null;
        try {
            const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
            const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            
            const { data, error } = await this.client.storage
                .from(SUPABASE_CONFIG.storageBucket)
                .upload(fileName, file, { cacheControl: '3600', upsert: true });

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
}

if (typeof window !== 'undefined') {
    window.supabaseService = new SupabaseService();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SUPABASE_CONFIG, SupabaseService };
}
