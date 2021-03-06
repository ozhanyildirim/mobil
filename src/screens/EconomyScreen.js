import React from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import getArticles from '../service/news';
import {Alert , View , Text, ActivityIndicator} from 'react-native';
import DataItem from '../../components/dataItem';
import Modal from '../../components/modal';
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];


export default class EconomyScreen extends React.Component {

    constructor(props) {
        super(props);
    
    this.state = {
        isLoading: true,
        data: null,
        setModalVisible: false,
        modalArticleData : {},
    }
    
    }

    handleItemDataOnPress = (articleData) => {
        this.setState({
          setModalVisible :true,
          modalArticleData : articleData
        });
    }

    handleModalClose = () => {
      this.setState({
        setModalVisible :false,
        modalArticleData : {},
      });
    }

    componentDidMount() {
        getArticles('business').then(data => {
          this.setState({
            isLoading: false,
            data: data
          });
        }, error => {
          Alert.alert('Error', 'Something went wrong!');
        }
        )
      }
  render() {
    console.log(this.state.data);

    let view = this.state.isLoading ? (
        <View style={{flex:1}}> 
        <ActivityIndicator style={{ justifyContent:'center', alignItems: 'center'}} animating={this.state.isLoading} />
        <Text style={{justifyContent:'center', alignItems: 'center'}}>Lütfen Bekleyin Yükleniyor</Text>
        </View>
    ) : (
        <List 
        dataArray = {this.state.data}
        renderRow={(item) => {
            return (
            <DataItem onPress={this.handleItemDataOnPress} data={item} />
            )
        }
      }
        
        />
    )


    return (
      <Container>
        <Content>
        
         {view}
        
        </Content>
        <Modal 
        showModal={this.state.setModalVisible}
        articleData={this.state.modalArticleData}
        onClose={this.handleModalClose}
        
        />
      </Container>
    );
  }
}