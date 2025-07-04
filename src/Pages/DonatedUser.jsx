import React from 'react'
import { Container } from '../components'
import UserDonation from '../components/UserDonation'
function DonatedUser() {
  return (
    <div className='py-8 w-full'>
        <Container>
        <UserDonation/>
        </Container>
    </div>
  )
}

export default DonatedUser;