import { StyleSheet } from "react-native";


export const createStyles = (colors:any)=>StyleSheet.create({

overlay:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"flex-end",
},


container:{
    backgroundColor:colors.card,
    padding:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    maxHeight:"70%",
},


title:{
    fontSize:18,
    fontWeight:"700",
    marginBottom:20,
    color:colors.text,
},


branchItem:{
    paddingVertical:15,
    borderBottomWidth:1,
    borderBottomColor:colors.border,
},


branchName:{
    fontSize:16,
    fontWeight:"600",
    color:colors.text,
},


branchAddress:{
    fontSize:14,
    color:colors.textSecondary,
    marginTop:4,
},


closeButton:{
    marginTop:15,
    alignItems:"center",
},


closeText:{
    color:colors.primary,
    fontWeight:"600",
},


});