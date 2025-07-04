import React from 'react'
import QRScannerComponent from '../components/QRScanner'
import { Container } from '../components'
function QRScanner() {
  return (
        <div className='py-8 w-full flex items-center justify-center'>
            <Container>
                <QRScannerComponent/>
            </Container>
        </div>
  )
}

export default QRScanner