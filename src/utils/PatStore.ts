export class PatStore {
    private cache: OrgSettingsCollection & Object;

    constructor() {
        const settings = localStorage.getItem("org_settings");
        this.cache = settings
            ? (JSON.parse(settings) as OrgSettingsCollection)
            : {};
    }

    get() {
        return { ...this.cache };
    }

    exists(name: string) {
        return this.cache.hasOwnProperty(name);
    }

    names() {
        return Object.keys(this.cache);
    }

    encode(pat: string) {
        return btoa(`:${pat}`);
    }

    add(settings: OrgSettings) {
        this.cache = { ...this.cache, [settings.name]: settings };
        localStorage.setItem("org_settings", JSON.stringify(this.cache));
        return this.cache;
    }

    remove(name: string) {
        const { [name]: _, ...cache } = this.cache;
        this.cache = cache;
        localStorage.setItem("org_settings", JSON.stringify(this.cache));
        return this.cache;
    }
}

export interface OrgSettingsCollection {
    [name: string]: OrgSettings;
}

export interface OrgSettings {
    name: string;
    alias: string;
    pat: string;
}

export const patStore = new PatStore();
