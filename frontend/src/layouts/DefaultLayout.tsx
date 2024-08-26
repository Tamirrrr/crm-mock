import {Link, useNavigate} from "react-router-dom";

export function DefaultLayout({children}) {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header
                className="sticky z-20 top-0 flex h-16  items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav
                    className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        to={'/customers'}
                        className="text-muted-foreground transition-colors hover:text-foreground text-lg"
                    >
                        Customers
                    </Link>
                </nav>
            </header>
            <div
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
            </div>
        </div>
    )
}
