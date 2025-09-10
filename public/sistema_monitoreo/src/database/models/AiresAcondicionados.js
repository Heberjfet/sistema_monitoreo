class AiresAcondicionados {
    constructor(id, tiempoUso, observaciones) {
        this.id = id;
        this.tiempoUso = tiempoUso;
        this.observaciones = observaciones;
    }

    static getSchema() {
        return {
            id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
            tiempoUso: 'INTEGER NOT NULL',
            observaciones: 'TEXT'
        };
    }

    static async createTable(db) {
        const schema = this.getSchema();
        const columns = Object.entries(schema)
            .map(([key, value]) => `${key} ${value}`)
            .join(', ');

        const query = `CREATE TABLE IF NOT EXISTS AiresAcondicionados (${columns});`;
        await db.run(query);
    }

    // Additional methods related to Aires Acondicionados can be added here
}