import React from 'react'

function Hero() {
  return (
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Todo App
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Organize your tasks, boost your productivity, and achieve your goals with our simple and effective todo app.
                </p>
              </div>
              <div className="space-x-4">
                <Button href="/signup">
                  <Button>Get Started</Button>
                </Button>
                <Button href="/features">
                  <Button variant="outline">Learn More</Button>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}

export default Hero