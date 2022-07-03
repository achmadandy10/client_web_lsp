import Head from "next/head";

interface HeaderProps {
    title?: string
}

export default function Header({ title }: HeaderProps) {
    return (
        <Head>
            <title>{ title ? title + " - Himti" : "Himti" }</title>
        </Head>
    )
}