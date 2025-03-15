import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href="https://vadim-s-portfolio.vercel.app/" className="flex font-bold items-center">

              <h3 className="text-2xl">Vadims page</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Контакты</h3>
            <div>
              <Link href="https://github.com/u0100" className="opacity-60 hover:opacity-100" target="_blank">
                Github
              </Link>
            </div>

            <div>
              <Link href="https://t.me/u00110" className="opacity-60 hover:opacity-100" target="_blank">
                Telegram
              </Link>
            </div>

          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Платформы</h3>
            <div className="opacity-60">
                iOS
            </div>

            <div className="opacity-60">
                Android
            </div>

            <div  className="opacity-60">
                Web
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Помощь</h3>

            <div>
              <Link href="#faq" className="opacity-60 hover:opacity-100">
                FAQ
              </Link>
            </div>

          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Другое</h3>
            <div>
              <Link href="https://steamcommunity.com/profiles/76561197992378564/" className="opacity-60 hover:opacity-100" target="_blank">
                Steam
              </Link>
            </div>

            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>

          </div>
        </div>

        <Separator className="my-6" />
        <section className="">
          <h3 className="#">
           March 6, 2025
            <Link
              target="_blank"
              href="#"
              className="text-primary transition-all border-primary hover:border-b-2 ml-1"
            >
              
            </Link>
          </h3>
        </section>
      </div>
    </footer>
  );
};
