import Link from "next/link"

const Footer = () => {
    return (
        <footer className="bg-white sm:p-8 p-4 mt-10">
            <div className="flex flex-col justify-between items-center text-center gap-4 max-w-3xl mx-auto">
                <div>
                    <h3 className="sm:text-2xl text-xl font-semibold">
                        <span className="text-primary">Image</span>Con
                    </h3>

                    <div className="h-0.5 w-40 bg-primary mx-auto mt-1" />

                    <p className="text-sm text-foreground/70 mt-4">
                        Free, client-side open-source image converter. Transform modern image formats directly inside your browser with maximum speed and zero tracking.
                    </p>
                </div>

                <p className="text-sm text-foreground/70 mt-10">
                    &copy; {new Date().getFullYear()} ImageCon. Made with ❤️ by <Link href="https://github.com/coderSuresh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">coderSuresh</Link>.
                </p>
            </div>
        </footer>
    )
}

export default Footer
