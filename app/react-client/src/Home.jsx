import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Home extends React.Component {

constructor(props) {

super(props);
    this.state = { 
      sth : 'sth'
    }

}

render () {

  return (
     
     <div >
     
      <div className="container-fluid" style={{padding:'5%'}}>
        <div className="row " style={{paddingLeft:'7%'}}>
          <div className="col-sm-8 floatRight">
            <h2 className="f">What Is Fair Share</h2>
            <br/>
            <p style={{fontSize:'19px', opacity: '0.7'}}>
            As the refugees’ crises continues and with the dramatic increase in the numbers of afflicted families, comes the responsibility of the international community to fulfill the huge demand for aid. In fair share we aim to ease the process of distributing aid fairly and wisely among the people in need, and reduce the possibility of fraud to make sure the right people are getting their deserved share, to achieve our noble purpose we are using the latest technologies that will provide a better synchronization among all the operating organizations all around the globe.</p>      
          </div>
          <div className="col-sm-4 floatLeft ">
            <span className="glyphicon glyphicon-grain logoI"></span>
          </div>
        </div>
      </div>
      
      <div className="container-fluid greyB" style={{padding:'5%', backgroundColor:'#C7CBCA'}}>
        <div className="row" style={{paddingLeft:'7%'}}>
          <div className="col-sm-4">
            <span className="glyphicon glyphicon-link logoI"></span>
          </div>
          <div className="col-sm-8">
            <h2 style={{fontFamily:'Merriweather'}}>Technology</h2>
            <h4><strong>The Power Of Blockchain:</strong></h4>      
            <p style={{fontSize:'19px', opacity: '0.7'}}> Blockchain is a revolutionary technology, Fair Share rely on blockchain to build a distributed decentralized database-like ledger that is shared, replicated, and synchronized among our organizations network. All aids provided, families’ detailed info and organizations credentials will be saved  and hashed in blocks.
              Using this ledger every organization can know exactly when has a certain family received help, from who, how much and more information that will secure more accurate resources distribution.</p>
          </div>
        </div>
      </div>
      
<div className="container-fluid text-center" style={{padding:'5%'}}>

        <h2 style={{fontFamily:'Merriweather'}}>Our Values</h2>
  <div id="myCarousel" className="carousel slide text-center" data-ride="carousel">

    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>


    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <h4 style={{opacity:'0.7'}}>Transparency<br/></h4>
      </div>
      <div className="item">
        <h4 style={{opacity:'0.7'}}>Equality<br/></h4>
      </div>
      <div className="item">
        <h4 style={{opacity:'0.7'}}>Fairness<br/></h4>
      </div>
    </div>


    <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  
    </div>
    </div>

    <div className="container-fluid greyB text-center" style={{padding:'5%', backgroundColor:'#C7CBCA'}}>
            
        <h2 style={{ color:'#FF5733', fontFamily:'Merriweather'}}  >JOIN EXCELLENCE!</h2>
        <br/>
        <h4 style={{opacity:'0.7'}}>Get in touch and be part of the network!</h4>
        <br/>

        </div>

    <div id="myCarouse2" className="carousel slide" data-ride="carousel" >
        <ol className="carousel-indicators">
          <li data-target="#myCarouse2" data-slide-to="0" className="active"></li>
          <li data-target="#myCarouse2" data-slide-to="1"></li>
          <li data-target="#myCarouse2" data-slide-to="2"></li>
        </ol>

    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <img src="https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/IMAGE%20stillbirth%20coping.jpg" alt="New York" style={{width:'100%'}}/>
        <div className="carousel-caption">
          <h2>Did you know?</h2>
          <p style={{fontSize:'19px'}} >According to the UNHCR, 65.6 million people were forcebly displaced worldwide.</p>
        </div>      
      </div>

      <div className="item">
        <img src="https://laboratories.telekom.com/wp-content/uploads/2018/01/blockchain-1250.jpg" alt="Chicago" style={{width:'100%'}}/>
        <div className="carousel-caption">
          <h2>Hyperledger Fabric</h2>
          <p style={{fontSize:'19px'}} >is a blockchain framework implementation and one of the Hyperledger projects hosted by The Linux Foundation. Intended as a foundation for developing applications or solutions with a modular architecture, Hyperledger Fabric allows components, such as consensus and membership services, to be plug-and-play. Hyperledger Fabric leverages container technology to host smart contracts called “chaincode” that comprise the application logic of the system. Hyperledger Fabric was initially contributed by Digital Asset and IBM, as a result of the first hackathon.</p>
         </div>      
      </div>
    
      <div className="item">
        <img src="https://mountainx.com/wp-content/uploads/2014/10/SyrianPhotosForWeb1-1100x733.jpg" alt="Los Angeles" style={{width:'100%'}}/>
        <div className="carousel-caption">
          <h2>Childhood</h2>
          <p style={{fontSize:'19px'}}>Millions of children have migrated across borders or been forcibly displaced. As of 2016, 28 million children were living in forced displacement – this includes 12 million child refugees and child asylum seekers, and 16 million children living in internal displacement due to conflict and violence. These numbers do not include 7 million children internally displaced by natural disasters. Millions of other children had moved, within or across borders, in pursuit of better opportunities. <em>-UNICEF</em></p>
        </div>      
      </div>
    </div>

    <a className="left carousel-control" href="#myCarouse2" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href="#myCarouse2" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
    </div>
         </div>

      )
  }
}

export default Home;