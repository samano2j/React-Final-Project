const config = {
    localStorageKey: "root",
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,
    tableName: "Angular-MatTable-CRUD",
    data: {
        keys: 'key',
        ids: 'id',
        titles: 'title',
        states: 'state',
        urls: 'url',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
}

export default config