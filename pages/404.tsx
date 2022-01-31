const FourOFour = () => {
  return (
    <div
      className={
        "mx-auto w-app max-w-app flex flex-row items-center space-x-2 align-middle justify-center bg-background h-96"
      }
    >
      <h2 className={"text-secondary text-4xl"}>404</h2>
      <span className={"text-4xl text-tertiary"}>|</span>
      <span className={"text-xl text-onBackground"}>
        This page could not be found.
      </span>
    </div>
  )
}

export default FourOFour
