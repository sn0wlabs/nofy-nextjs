'use client'

import { createContext, useEffect, useState } from "react";
import { IContext, IContextOptions } from "../types";

/*                                                                    +
    Frontend context for providing login, logout, register and refresh
    'use client' needed for using -> client components only
    server components need to use useSession()
*/

const NOFY_API_URL = 'https://api.nofy.io'
const PUBLIC_KEY = Buffer.from(process.env.NOFY_PUBLIC_KEY + ':').toString('base64')

export const NofyContext = createContext<IContext>(null as any)

const NofyContextProvider = <IU,>({
    children,
    id,
}: IContextOptions) => {
    const getContext = () => {
        let context = id

        if (!id) {
            // if not logged in
            const cookie = document.cookie
                .split(';')
                .find((c) => c.includes('nofy_cid'))

            if (cookie) {
                // use cookie value
                context = cookie.split('=')[1]
            } else {
                // set new cookie
                context =
                    Math.random().toString(36).substring(2, 15) +
                    Math.random().toString(36).substring(2, 15)

                document.cookie = `nofy_cid=${context};path=/;max-age=31536000`
            }
        }

        return context
    }

    const event = async (name: string, value?: any): Promise<boolean> => {
        try {
            const contextId = getContext()

            const r = await fetch(NOFY_API_URL + '/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + PUBLIC_KEY,
                },
                body: JSON.stringify({
                    contextId,
                    name,
                    value,
                }),
            })

            const res = await r.json()
            if (res.error) throw new Error(res.error)

            return true
        } catch (e) {
            console.log('[NOFY] <event> error: ', e)
            return false
        }
    }

    const pageView = async (url: string, referer?: string): Promise<boolean> => {
        try {
            const contextId = getContext()

            const r = await fetch(NOFY_API_URL + '/log/count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + PUBLIC_KEY,
                },
                body: JSON.stringify({
                    meta: {
                        contextId,
                        type: 'pageview',
                    },
                    referer,
                    identifier: url,
                }),
            })

            const res = await r.json()
            if (res.error) throw new Error(res.error)

            return true
        } catch (e) {
            console.log('[NOFY] <pageView> error: ', e)
            return false
        }
    }

    return (
        <NofyContext.Provider value={{
            event,
            pageView,
        }}>
            {children}
        </NofyContext.Provider>
    );
}

export default NofyContextProvider;