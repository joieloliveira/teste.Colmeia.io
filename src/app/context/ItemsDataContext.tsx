"use client"

import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    Dispatch,
    SetStateAction,
    useMemo,
} from "react"

// Tipo do produto
export type ItemType = {
    id: string
    nome: string
    preco: number
    cardImg: string
    descricao: string
}

export type CartEntry = {
    id: string
    quantidade: number
}

// Tipo combinado: produto + quantidade
export type CartItemFull = ItemType & { quantidade: number }

// Tipo do contexto
export type ItemsDataContextType = {
    itemsData: ItemType[]
    setItemsData: Dispatch<SetStateAction<ItemType[]>>
    cartData: CartEntry[]
    setCartData: Dispatch<SetStateAction<CartEntry[]>>
    cartItems: CartItemFull[]
    addToCart: (id: string, quantidade?: number) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantidade: number) => void
    getCartCount: () => number
}

// Criação do contexto
export const ContextItemsData = createContext<ItemsDataContextType | undefined>(
    undefined
)

type ItemsDataProviderProps = {
    children: ReactNode
}

export function ItemsDataProvider({ children }: ItemsDataProviderProps) {
    // Estado do carrinho
    const [cartData, setCartData] = useState<CartEntry[]>(() => {
        if (typeof window !== "undefined") {
            const savedCart = localStorage.getItem("cart")
            return savedCart ? JSON.parse(savedCart) : []
        }
        return []
    })

    // Salva no localStorage sempre que mudar
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("cart", JSON.stringify(cartData))
        }
    }, [cartData])

    // Estado dos produtos (mock)
    const [itemsData, setItemsData] = useState<ItemType[]>([
        {
            id: "001", nome: "Produto 1", preco: 99.9, cardImg:
                "https://ae-pic-a1.aliexpress-media.com/kf/S6e691bd90bc7400c8e38e49776a42bb3W.jpg_960x960q75.jpg_.avif",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "002", nome: "Produto 2", preco: 87.6, cardImg:
                "https://ae-pic-a1.aliexpress-media.com/kf/HTB1qZsDc4iH3KVjSZPfq6xBiVXa8.jpg_960x960q75.jpg_.avif",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "003", nome: "Produto 3", preco: 120.0, cardImg:
                "https://a-static.mlcdn.com.br/1500x1500/conjunto-feminino-blusa-short-moda-roupas-femininas-bellucy-modas/bellucymodas/15865777912/420ca557478a8ed970e485267b337b4f.jpeg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "004", nome: "Produto 4", preco: 44.44, cardImg:
                "https://i.pinimg.com/236x/af/f6/d7/aff6d7cf99e140ec576a91a95d1d06b1.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "005", nome: "Produto 5", preco: 66.5, cardImg:
                "https://a-static.mlcdn.com.br/800x560/vestido-feminino-rodado-estampado-moda-roupas-femininas-bellucy-modas/bellucyltda/15817062752/cdc9cec1233f39ccb978b088f2ba1d22.jpeg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "006", nome: "Produto 6", preco: 64.32, cardImg:
                "https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_moda_roupa_feminina_2253_1_21b1b879173e04e216851c3e913cc576-e216851c3e913cc57616492702757364-480-0.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "007", nome: "Produto 7", preco: 110.12, cardImg:
                "https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_plus_size_ciganinha_roupa_feminina_plus_2367_2_b5f31e3379f3b9dbd04c709994bfad97-dbd04c709994bfad9716506392461240-1024-1024.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "008", nome: "Produto 8", preco: 99.9, cardImg:
                "https://tudocommoda.com/wp-content/uploads/2019/05/roupas-para-luau-10.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "009", nome: "Produto 9", preco: 89.9, cardImg:
                "https://img.ltwebstatic.com/images3_spmp/2023/10/01/8e/16961633785e7d58db83a29eb9c6b0686b17dab277_thumbnail_405x552.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "010", nome: "Produto 1", preco: 99.9, cardImg:
                "https://ae-pic-a1.aliexpress-media.com/kf/S6e691bd90bc7400c8e38e49776a42bb3W.jpg_960x960q75.jpg_.avif",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "011", nome: "Produto 2", preco: 87.6, cardImg:
                "https://ae-pic-a1.aliexpress-media.com/kf/HTB1qZsDc4iH3KVjSZPfq6xBiVXa8.jpg_960x960q75.jpg_.avif",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "012", nome: "Produto 3", preco: 120.0, cardImg:
                "https://a-static.mlcdn.com.br/1500x1500/conjunto-feminino-blusa-short-moda-roupas-femininas-bellucy-modas/bellucymodas/15865777912/420ca557478a8ed970e485267b337b4f.jpeg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "013", nome: "Produto 4", preco: 44.44, cardImg:
                "https://i.pinimg.com/236x/af/f6/d7/aff6d7cf99e140ec576a91a95d1d06b1.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "014", nome: "Produto 5", preco: 66.5, cardImg:
                "https://a-static.mlcdn.com.br/800x560/vestido-feminino-rodado-estampado-moda-roupas-femininas-bellucy-modas/bellucyltda/15817062752/cdc9cec1233f39ccb978b088f2ba1d22.jpeg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "015", nome: "Produto 6", preco: 64.32, cardImg:
                "https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_moda_roupa_feminina_2253_1_21b1b879173e04e216851c3e913cc576-e216851c3e913cc57616492702757364-480-0.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "016", nome: "Produto 7", preco: 110.12, cardImg:
                "https://acdn-us.mitiendanube.com/stores/002/037/298/products/vestido_feminino_plus_size_ciganinha_roupa_feminina_plus_2367_2_b5f31e3379f3b9dbd04c709994bfad97-dbd04c709994bfad9716506392461240-1024-1024.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "017", nome: "Produto 8", preco: 99.9, cardImg:
                "https://tudocommoda.com/wp-content/uploads/2019/05/roupas-para-luau-10.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
        {
            id: "018", nome: "Produto 9", preco: 89.9, cardImg:
                "https://img.ltwebstatic.com/images3_spmp/2023/10/01/8e/16961633785e7d58db83a29eb9c6b0686b17dab277_thumbnail_405x552.jpg",
            descricao: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        },
    ])

    // Junta os produtos com suas quantidades do carrinho
    const cartItems = useMemo(() => {
        return cartData
            .map(cartItem => {
                const product = itemsData.find(item => item.id === cartItem.id)
                return product ? { ...product, quantidade: cartItem.quantidade } : null
            })
            .filter(Boolean) as CartItemFull[]
    }, [itemsData, cartData])

    const getCartCount = () => {
        return cartData.reduce((total, item) => total + item.quantidade, 0)
    }

    // add remove update
    const addToCart = (id: string, quantidade = 1) => {
        setCartData(prev => {
            const exists = prev.find(p => p.id === id)
            if (exists) {
                return prev.map(p =>
                    p.id === id
                        ? { ...p, quantidade: p.quantidade + quantidade }
                        : p
                )
            }
            return [...prev, { id, quantidade }]
        })
    }

    const removeFromCart = (id: string) => {
        setCartData(prev => prev.filter(p => p.id !== id))
    }

    const updateQuantity = (id: string, quantidade: number) => {
        setCartData(prev =>
            prev.map(p =>
                p.id === id
                    ? { ...p, quantidade: Math.max(1, quantidade) }
                    : p
            )
        )
    }

    return (
        <ContextItemsData.Provider
            value={{
                itemsData,
                setItemsData,
                cartData,
                setCartData,
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                getCartCount,
            }}
        >
            {children}
        </ContextItemsData.Provider>
    )
}
