'use strict';
Vue.component("footer-section", {
  template:`<div class="reCAP-wrap">

      <div class="reCAP-footer-container">
          <div class="reCAP-links-container">
                <a href="https://www.computerservice-wolf.com/impressum.html" rel="noopener noreferrer" target="_blank"
                  hreflang="en">Legal Notice</a>

                <a href="https://bsky.app/profile/recap-conf.bsky.social" rel="noopener noreferrer" target="_blank"
                  hreflang="en" title="Follow us on Bluesky">
                  <svg aria-hidden="true">
                        <use xlink:href="images/icons/sprite.svg#bluesky"></use>
                    </svg>Bluesky
                </a>

                <a href="https://www.linkedin.com/company/recap-conference/" rel="noopener noreferrer" target="_blank"
                  hreflang="en">
                  <svg aria-hidden="true">
                        <use xlink:href="images/icons/sprite.svg#linkedin"></use>
                    </svg>LinkedIn
                </a>

                <a href="mailto:recap.conf@gmail.com?subject=[reCAP 2025] Question" target="_blank" rel="noopener noreferrer" title="contact us via mail">
                    <svg aria-hidden="true">
                        <use xlink:href="images/icons/sprite.svg#mail"></use>
                    </svg>Mail
                </a>

          </div>
      </div>
  </div>`
});