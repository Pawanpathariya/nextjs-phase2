import React from 'react'

const Favourite:React.FC = () => {
  return (
   <div className='m-4'>
<h2 className='pl-4'>Your Favourite Picks</h2>
<div className='flex flex-wrap justify-evenly'> 
<div >
    <img src="/images/fav1.webp" alt="" width={700}/>
</div>
<div>
    <img src="/images/fav2.webp" alt="" width={700}/>
</div>
</div>

<div className='flex flex-wrap  justify-evenly'>
<div>
<img src="/images/fav3.webp" alt="" />
</div>
<div>
<img src="/images/fav4.webp" alt="" />
</div>
<div>
<img src="/images/fav5.webp" alt="" />
</div>
<div>
<img src="/images/fav6.webp" alt="" />
</div>

</div>
   </div>
  )
}

export default Favourite