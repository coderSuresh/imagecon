const Features = () => {

    const features = [
        {
            title: 'Blazing Fast',
            description: 'Optimized multithreaded processing allows direct transformation of modern formats without lingering in long server queues.',
        },
        {
            title: 'Privacy First',
            description: 'Your photos belong to you. Conversions execute entirely on your device client-side or instantly discarded right after processing.',
        },
        {
            title: 'Modern Formats',
            description: 'Compress high-definition photos into WebP or AVIF to drastically reduce webpage payload without any perceived quality loss.',
        }
    ]

    return (
        <div className="mt-20 mb-10 py-10 flex gap-8 flex-wrap justify-center">
            {features.map((feature, index) => (
                <div key={index} className="flex-1 min-w-xs sm:p-8 p-4 bg-white shadow rounded-lg">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-foreground/70 mt-4">{feature.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Features
