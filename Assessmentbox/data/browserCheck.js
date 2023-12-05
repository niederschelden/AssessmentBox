class BrowserCheck {
    static isIOSorSafari() {
      var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      return isIOS || isSafari;
    }
  
    static addAppleMetaTags() {
      if (this.isIOSorSafari()) {
        const tags = [
          { name: 'apple-mobile-web-app-capable', content: 'yes' },
          { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
          { name: 'apple-mobile-web-app-title', content: 'AssessmentBox' },
        ];
  
        const icons = [
          { sizes: '120x120', href: 'icon-120x120.png' },
          { sizes: '152x152', href: 'icon-152x152.png' },
          { sizes: '167x167', href: 'icon-167x167.png' },
          { sizes: '180x180', href: 'icon-180x180.png' },
          { sizes: '192x192', href: 'icon-192x192.png' },
          { sizes: '512x512', href: 'icon-512x512.png' }
        ];
  
        tags.forEach(tag => {
          const metaTag = document.createElement('meta');
          metaTag.setAttribute('name', tag.name);
          metaTag.setAttribute('content', tag.content);
          document.head.appendChild(metaTag);
        });
  
        icons.forEach(icon => {
          const link = document.createElement('link');
          link.setAttribute('rel', 'apple-touch-icon');
          link.setAttribute('sizes', icon.sizes);
          link.setAttribute('href', icon.href);
          document.head.appendChild(link);
        });
      }
    }
  }
//Das Skript muss mit defer eingebunden sein, damit nach dem Laden und Parsen des Dokuments ausgeführt wird.
BrowserCheck.addAppleMetaTags();