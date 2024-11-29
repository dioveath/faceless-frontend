export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="container mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
            {children}
        </main>
    );
}