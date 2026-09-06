const HowItWorks = () => {

    const steps = [
        {
            title: 'Upload Your Images',
            description: 'Drag and drop your images or click to select files from your device. Supports PNG, JPG, WebP, SVG, and AVIF formats.',
        },
        {
            title: 'Choose Conversion Options',
            description: 'Select the desired output format and any additional settings for your images. You can also choose to compress them for faster loading times.',
        },
        {
            title: 'Convert and Download',
            description: 'Click the convert button to process your images. Once done, download them individually or as a ZIP file for convenience.',
        }
    ]

    return (
        <section className="my-10 py-10">

            <p className="text-sm py-2 px-4 mb-4 rounded-full bg-primary/7 border border-primary/70 w-fit mx-auto md:px-8 text-primary font-medium">
                How It Works
            </p>

            <h2 className="text-3xl font-extrabold text-center mb-6">
                How to Convert Images Online for Free
            </h2>
            <p className="text-foreground/70 text-center max-w-3xl mx-auto">
                Convert high-resolution graphics, photos, and web assets right inside your browser with zero complicated software installation.
            </p>

            <div className="mt-10 flex gap-8 flex-wrap justify-center">
                {steps.map((step, index) => (
                    <div key={step.title} className="flex-1 min-w-xs sm:p-8 p-4 bg-white shadow rounded-lg">
                        <h3 className="text-lg font-semibold">
                            <span className="text-primary">
                                {(index + 1).toString().padStart(2, '0')}.
                            </span> &nbsp;
                            {step.title}
                        </h3>
                        <p className="text-foreground/70 mt-4">{step.description}</p>
                    </div>
                ))}
            </div>

        </section>

    )
}

export default HowItWorks
