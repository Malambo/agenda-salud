
export default function LayoutPublicas({children}: Readonly<{children: React.ReactNode}>) {

    return (
        <div className='container mx-auto my-12 p-8 sm:p-0'>
            {children}
        </div>
    )
}
