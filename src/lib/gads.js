export default function () {
  const script = document.querySelector('script[data-ad-client=ca-pub-9203783485756583]')
  script.remove()
  document.querySelector('head').appendChild(script)
}
