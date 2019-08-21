import React, { Component } from "react";
import {
  Card,
  Container,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesActions";
import { getCurrentProfile } from "./../actions/profileActions";
import { debounce } from "lodash";


class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      city: "",
      country: "",
      query: "",
      error: null,
      text: "",
      columnDefs: [{
        headerName: "Make", field: "cityname", sortable: true , filter: true 
      }, {
        headerName: "Model", field: "country", sortable: true , filter: true 
      }, {
        headerName: "Price", field: "flagimg", sortable: true , filter: true 
      }],
      
      // filteredCities: []
    };
  }

  componentDidMount() {
    this.props.fetchCities();
  }

  // SEARCH WITH DEBOUNCE
  handleSearch = debounce(text => {
    this.setState({
      query: text
    });
  }, 500);

  render() {
    const listArray = [];
    const listBfore = this.props.cities.cities || [];
    if(listBfore.length > 0){
      listBfore.forEach(function (item, index) {
        const newItem = item;
        newItem.id = index +1;
        listArray.push(newItem)
      });
    }
    console.log(listArray);

    const CustomColumn = ({value}) => <span style={{ color: '#0000AA' }}>{value}</span>;
  const CustomHeading = ({title}) => <span style={{ color: '#AA0000' }}>{title}</span>;

    return (
      <div>
        <div className="content">
        <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <h1 className="text-center">Students</h1>
                  <Row className="row-grid justify-content-center">
                    
                    <Col lg="12">
                    <Card className=" card-plain">
                    <CardHeader>
                     
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col className="text-center" md="12">

                        {listArray.length > 0 &&
         <div>
<BootstrapTable ref='table' data={listArray}  >
      <TableHeaderColumn isKey dataField='id' dataSort={ true } filter={ { type: 'TextFilter'} }>Sl.No</TableHeaderColumn>
      <TableHeaderColumn  dataField='cityname' dataSort={ true } filter={ { type: 'TextFilter'} }>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='country' dataSort={ true } filter={ { type: 'TextFilter'} }>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField='flagimg'>Product Price</TableHeaderColumn>
  </BootstrapTable>,
           
         </div>
      }
                       
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter className="text-center">
                    
                    </CardFooter>
                  </Card>
                      
                  
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
        
         
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    favid: state.favid,
    profile: state.profile
  };
};

Students.propTypes = {
  cities: PropTypes.object,
  fetchCities: PropTypes.func,
  getCurrentProfile: PropTypes.func
};

export default connect(
  mapStateToProps,
  { fetchCities, getCurrentProfile }
)(Students);
