
export default function LayoutPublicas({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <div className='container mt-12 mx-auto p-12 flex flex-col items-center content-center'>
            {children}
        </div>
    )
}
