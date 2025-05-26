
export interface Article {
    data: {
        title: string;
        except: string;
        source: 'Axopen' | 'Dev.to' | 'Medium';
        url: string;
    }
}

// Multi-language
export interface Multi {
    [key: string]: string;
}

export interface Link {
    id: string;
    href: string;
    label: string;
}