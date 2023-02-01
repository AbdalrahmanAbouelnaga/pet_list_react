import { Nav } from "./Nav"
export const Layout = ({children}) => {
  return (
    <>
        <Nav />
        <div >
            <main className={`has-background-white columns is-multiline mt-6`}>{children}</main>
            <footer className="footer is-light">
            <p className="has-text-centered">&copy; E Store</p>
            </footer>
        </div>

    </>
  )
}
