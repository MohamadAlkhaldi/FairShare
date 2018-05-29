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
          <div className="col-sm-8 floatRight f">
            <h2 >What Is Fair Share</h2>
            <h4 >blabla bla blablabla blabla bla blablabla blabla bla blablab blabla bla blablabla blabla bla blablabla blabla bla blablab blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla</h4>      
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
            <h4> blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla</h4>
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
        <h4>Transparency<br/></h4>
      </div>
      <div className="item">
        <h4>Equality<br/></h4>
      </div>
      <div className="item">
        <h4>Fairness<br/></h4>
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
        <h4>blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla blabla bla blablabla</h4>
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
          <h3>blabla blabla</h3>
          <p>blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla</p>
        </div>      
      </div>

      <div className="item">
        <img src="https://laboratories.telekom.com/wp-content/uploads/2018/01/blockchain-1250.jpg" alt="Chicago" style={{width:'100%'}}/>
        <div className="carousel-caption">
          <h3>blabla blabla</h3>
          <p>blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla</p>
         </div>      
      </div>
    
      <div className="item">
        <img src="https://mountainx.com/wp-content/uploads/2014/10/SyrianPhotosForWeb1-1100x733.jpg" alt="Los Angeles" style={{width:'100%'}}/>
        <div className="carousel-caption">
          <h3>blabla blabla</h3>
          <p>blabla blabla blabla blabla blabla blabla blabla blabla blabla blabla</p>
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