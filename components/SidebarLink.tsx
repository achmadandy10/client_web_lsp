interface SidebarLinkProps {
    label: string
    Icon: any
    active?: boolean
}

export default function SidebarLink({ label, Icon, active }: SidebarLinkProps) {
    return (
        <div className={`
                flex items-center
                justify-center xl:justify-start
                text-xl space-x-3 hoverAnimation
                ${ active && "font-bold text-blue-600" }
            `}
        >
            <Icon className="h-7"/>
            <span className="hidden xl:inline">{ label }</span>
        </div>
    )
}
