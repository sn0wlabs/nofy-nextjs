export interface IContextOptions {
    children: React.ReactNode;

    id?: React.SetStateAction<string>;

    publicKey: string;
}

export interface IContext {
    event: (name: string, value?: any) => Promise<boolean>;
    pageView: (url: string, referer?: string) => Promise<boolean>;
}
