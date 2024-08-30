# nofy-nextjs

nofy package for NextJS

## How to use

Configure the provider

```tsx
// /src/app/layout.tsx

import { NofyProvider } from "nofy-nextjs";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <NofyProvider publicKey="sp_XXXX-X-X-X-XXX">
                    {children}
                </NofyProvider>
            </body>
        </html>
    );
}
```

Use the useNofy context in server components to log events or pageviews

```tsx
// /src/app/ClientComponent.tsx

import { useNofy } from "nofy-nextjs";

const CComponent = async () => {
    const { pageView } = useNofy();

    useEffect(() => {
        pageView("/ClientComponent");
    }, []);

    return <div>...</div>;
};

export default CComponent;
```

## Todo

-   [ ]: Upload request with worker as helper (?)
-   [ ]: Refresh logic
-   [x]: Change returns at error
-   [x]: GET request with auth
-   [x]: POST request with auth
-   [x]: Fix issue with getSession serverside and config set at layout (If used at api/\_/route.tsx)
-   [x]: Fix issue with api endpoints if no layout has been loaded (if accessing api directly)
