import React from 'react'
import AddIssueComponent from '../components/AddIssue'
import { Container } from '../components'
function AddIssue() {
  return (
   <div className='py-8 w-full'>
           <Container>
           <AddIssueComponent/>
           </Container>
       </div>
  )
}

export default AddIssue