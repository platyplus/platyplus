import Highlight, { defaultProps, Language } from 'prism-react-renderer'

export const CodeBlock: React.FC<{ code: string; language: Language }> = ({
  code,
  language
}) => (
  <Highlight {...defaultProps} code={code} language={language}>
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
)
