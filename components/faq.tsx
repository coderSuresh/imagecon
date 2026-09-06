const Faq = () => {

    const faqs = [
        {
            question: "Is my data safe and private?",
            answer: "Yes, 100%. All image encoding, compression, and conversions happen directly in your browser's local sandbox memory using client-side WebAssembly. None of your private photos or proprietary designs are ever sent to or stored on an external cloud server."
        },
        {
            question: "What image formats are supported?",
            answer: "We support a wide range of image formats including PNG, JPG, WebP, SVG, and AVIF. You can convert between these formats seamlessly."
        },
        {
            question: "Can I convert multiple images at once?",
            answer: "Absolutely! Our tool allows batch processing, enabling you to convert and compress multiple images simultaneously. You can also download them as a ZIP file for convenience."
        },
        {
            question: "What are the advantages of WebP and AVIF over JPEG/PNG?",
            answer: "WebP and AVIF are modern image formats that offer superior compression and quality compared to traditional formats like JPEG and PNG. They can significantly reduce file sizes while maintaining visual fidelity, which is beneficial for faster webpage loading times and improved user experience."
        },
        {
            question: "Do I need to create an account or sign up?",
            answer: "No account or signup is required. You can use our image converter freely without any registration."
        },
        {
            question: "Is there a limit to the number of images I can convert?",
            answer: "There are no strict limits on the number of images you can convert. However, performance may vary based on your device's capabilities and browser limitations."
        },
        {
            question: "Can I use this tool on mobile devices?",
            answer: "Yes, our image converter is fully responsive and works on both desktop and mobile devices. You can convert images directly from your smartphone or tablet."
        }
    ]

    return (
        <section className="my-10 py-10">
            <h2 className="text-3xl font-extrabold text-center mb-6">
                Frequently Asked Questions
            </h2>
            <p className="text-foreground/70 text-center max-w-3xl mx-auto">
                Everything you need to know about browser-based free image conversion, privacy safeguards, and performance.
            </p>

            <div className="max-w-3xl mx-auto mt-10">
                {faqs.map((faq) => ( 
                    <div key={faq.question} className="bg-white sm:p-8 p-4 rounded-lg shadow mb-4">
                        <h3 className="text-lg font-semibold">{faq.question}</h3>
                        <p className="text-foreground/70 mt-4">{faq.answer}</p>
                    </div>
                ))}
            </div>

        </section>
    )
}

export default Faq
