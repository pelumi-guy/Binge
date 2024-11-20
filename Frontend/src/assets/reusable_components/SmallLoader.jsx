import React from 'react'

const SmallLoader = () => {
  return (
    <div
        style={{ width: '100%', height: '25px', marginTop: '60px' }}
    >
        <div
          className="col-md-12"
          style={{
            textAlign: "center", color: "rgba(155, 81, 224, 1)", position: "relative"
          }}
        >
          <i className="pi pi-spin pi-spinner fav-loader"
          // style={{ fontSize: '5rem', position: "absolute", top: "50%" }}
          >

          </i>
        </div>
    </div>
  )
}

export default SmallLoader