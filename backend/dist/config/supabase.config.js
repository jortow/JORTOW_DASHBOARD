"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.createSupabaseClient = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const createSupabaseClient = (configService) => {
    const supabaseUrl = configService.get('SUPABASE_URL');
    const supabaseServiceRoleKey = configService.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error('Missing Supabase configuration');
    }
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
};
exports.createSupabaseClient = createSupabaseClient;
exports.UserRole = {
    BASIC: 'basic',
    PRO: 'pro',
    EXCLUSIVE: 'exclusive',
};
//# sourceMappingURL=supabase.config.js.map