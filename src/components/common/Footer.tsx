import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t bg-background/95 mt-10">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          Built with React, TypeScript, Shadcn UI & AI ✨ (Prototype)
        </p>
      </div>

      {/* Chatbase Script */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
            <script>
              (function() {
                if (!window.chatbase || window.chatbase("getState") !== "initialized") {
                  window.chatbase = (...arguments) => {
                    if (!window.chatbase.q) {
                      window.chatbase.q = [];
                    }
                    window.chatbase.q.push(arguments);
                  };
                  window.chatbase = new Proxy(window.chatbase, {
                    get(target, prop) {
                      if (prop === "q") {
                        return target.q;
                      }
                      return (...args) => target(prop, ...args);
                    }
                  });
                }
                const onLoad = function() {
                  const script = document.createElement("script");
                  script.src = "https://www.chatbase.co/embed.min.js";
                  script.id = "c9ddswh1wuvYCKsrAazvt";
                  script.domain = "www.chatbase.co";
                  document.body.appendChild(script);
                };
                if (document.readyState === "complete") {
                  onLoad();
                } else {
                  window.addEventListener("load", onLoad);
                }
              })();
            </script>
          `,
        }}
      />
    </footer>
  );
};

export default Footer;
