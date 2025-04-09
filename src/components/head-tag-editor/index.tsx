import { Helmet } from 'react-helmet-async';
import { isDarkishTheme } from '../../utils';

type HeadTagEditorProps = {
  googleAnalyticsId?: string;
  appliedTheme: string;
  umamiDomain?: string;
  umamiId?: string;
};

/**
 * Renders the head tag editor component.
 *
 * @param {HeadTagEditorProps} googleAnalyticsId - The Google Analytics ID.
 * @param {HeadTagEditorProps} appliedTheme - The applied theme.
 * @return {React.ReactElement} The head tag editor component.
 */
const HeadTagEditor: React.FC<HeadTagEditorProps> = ({
  googleAnalyticsId,
  appliedTheme,
  umamiDomain,
  umamiId,
}) => {
  return (
    <Helmet>
      <meta
        name="theme-color"
        content={isDarkishTheme(appliedTheme) ? '#000000' : '#ffffff'}
      />
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          ></script>

          <script>
            {`window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');
`}
          </script>
        </>
      )}
      {umamiDomain && umamiId && (
        <>
          <script
            defer
            src={`https://${umamiDomain}/script.js`}
            data-website-id={umamiId}
          ></script>
        </>
      )}
    </Helmet>
  );
};

export default HeadTagEditor;
