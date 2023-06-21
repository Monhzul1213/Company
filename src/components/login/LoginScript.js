import Frame from 'react-frame-component';

export function LoginScript(){
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      overflow: 'hidden',
      background: 'transparent',
    }}>
      <Frame
        frameBorder={0}
        height={58}
        width={185}
        padding={0}
        initialContent={`
          <!DOCTYPE html>
          <html>
            <head>
              <script type="text/javascript"> //<![CDATA[
                var tlJsHost = ((window.location.protocol !== "https:") ? "https://secure.trust-provider.com/" : "http://www.trustlogo.com/");
                document.write(unescape("%3Cscript src='" + tlJsHost + "trustlogo/javascript/trustlogo.js' type='text/javascript'%3E%3C/script%3E"));
              //]]></script>
            </head>
            <body>
              <div id="mountHere"></div>
              <script language="JavaScript" type="text/javascript">
                TrustLogo("https://www.positivessl.com/images/seals/positivessl_trust_seal_md_167x42.png", "POSDV", "none");
              </script>
            </body>
          </html>`
        }
        mountTarget='#mountHere'>
      </Frame>
    </div>
  );
}