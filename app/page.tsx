import Faq from "@/components/faq"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Uploader from "@/components/uploader"

const Home = () => {

  const highlights = [
    "100% private in-browser processing",
    "Batch conversion and ZIP download",
    "Lossless compression",
    "No Signup or Account Required",
  ]

  return (
    <main className="container-padding my-15">

      {/* hero section */}
      <section className="text-center">
        <p className="text-sm py-2 px-4 rounded-full bg-primary/7 border border-primary/70 w-fit mx-auto md:px-8 text-primary font-medium">
          Free Online Image Converter
        </p>
        <h1 className="md:text-5xl text-3xl font-extrabold my-4 leading-tight">
          Fast, Free & Secure <br /> <span className="text-primary">Online Image Converter</span>
        </h1>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          Effortlessly convert images between PNG, JPG, WebP, HEIC and AVIF images in seconds. Optimize graphics for Google Core Web Vitals with instant lossless compression and batch processing—executed 100% privately in your browser with zero cloud uploads.
        </p>

        <ul className="flex flex-row flex-wrap items-center justify-center gap-4 mt-6">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 text-foreground/70 bg-white border border-primary/70 px-4 py-2 rounded-full text-xs"
            >
              <span className="text-primary">✓</span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <Uploader />

      <Features />

      <HowItWorks />

      <Faq />

    </main>
  )
}

export default Home
