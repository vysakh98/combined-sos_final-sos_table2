<template>
<div>
<v-data-table
:headers="headers"
:items="items"
class="elevation-1">
<template #body.append="{headers}">
<tr :colspan="headers.length">
<td>Others-Sub-Total</td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><v-chip color="blue">{{Sum}}</v-chip></td>
<td></td>
<td></td>
</tr>
</template>
<template #top>
<div class="top-div"><p class="display-1 white--text">Other-Contributors
<span>
<v-tooltip bottom>
<template #activator="{ on }">
<v-btn id="add1" class="white--text" @click="add" v-on="on"><v-icon class="black--text">add</v-icon></v-btn>
</template>
<span>add row</span>
</v-tooltip>
</span>
</p></div>
</template>
<template #item.Amount="{item}">
<tr>
  <td v-if="Amountedit && editindex==items.indexOf(item)">
     <v-text-field @keydown="save($event,item.Amount,item)" v-model="Amount" type="number" :placeholder="item.Amount"></v-text-field>
  </td>
  <td  v-else>{{item.Amount}}</td>
</tr>
</template>
<template #item.Organization="{item}">
<tr>
    <td v-if="Organizationedit && editindex==items.indexOf(item)">
     <v-text-field  v-model="Organization" :placeholder="item.Organization">{{item.Organization}}</v-text-field>
    </td>
    <td class="td" v-else>{{item.Organization}}</td>
</tr>
</template>
<template #item.Description="{item}">
<tr>
   <td v-if="Descriptionedit && editindex==items.indexOf(item)">
     <v-text-field   v-model="Description" :placeholder="item.Description">{{item.Description}}</v-text-field>
   </td>
   <td  v-else>{{item.Description}}</td>
</tr>
</template>
<template #item.del="{item}">
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="del" @click="deleteitem(item)"  v-on="on">delete</v-icon>
</template>
<span>delete</span>
</v-tooltip>
<v-tooltip bottom>
<template #activator="{ on }">
<v-icon id="edit" @click="edit(item)" v-on="on">edit</v-icon>
</template>
<span>edit</span>
</v-tooltip>
</template>
</v-data-table>
<v-snackbar v-model="snackbar" :color="snackColor" :timeout="3000"><h1>{{ snackbarText }}</h1>
<v-btn color="blue" text @click="snackbar = false"> Close </v-btn>
</v-snackbar>
</div>
</template>
<script>
export default{
  data(){
  return{
  snackColor:'',
  snackbar:false,
  snackbarText:'',
  submitStatus:'',
  editable:false,
  on:true,
  count:null,
  editindex:null,
  Organizationedit:false,
  Amountedit:false,
  Descriptionedit:false,
  idedit:false,
  del:'',
  Sum:0,
  Amount:0,
  Description:'',
  Organization:'',
  Othersid:null,
  items:[],
  headers:[
   {text: 'Organization',
            align: 'start',
            sortable: false,
            value: 'Organization',},
            {text:'',value:'',sortable:false},
            {text:'',value:'',sortable:false},
            {text:'',value:'',sortable:false},
             {text:'Description',value:'Description'},
            {text:'',value:'',sortable:false},
            {text:'',value:'',sortable:false},
             {text:'',value:'',sortable:false},
              {text:'',value:'',sortable:false},
               {text:'',value:'',sortable:false},
             {text:'',value:'Amount'},
             {text:'',value:'',sortable:false},
             {text:'',value:'del'}
          ]
  }
  },
  methods:{

  /* to find edit index and make textboxes editable */

  edit(item){
  let editindex = this.items.indexOf(item)
  this.editindex=editindex
  this.Organizationedit=true
  this.Amountedit=true
  this.Descriptionedit=true
  this.submitStatus='edit'
  console.log(this.items[this.editindex].Othresid)
  },
  add(){
  if(this.items.length==0){
  this.Othersid=this.Othersid+1
  }
  else{
  const itemsLength=(this.items.length)-1
  this.Othersid=(this.items[itemsLength].Othresid)+1
  console.log(this.items.length)
  }
  this.count=this.count+1
  this.editindex=this.count
  this.Organizationedit=true
  this.Amountedit=true
  this.Descriptionedit=true
  this.submitStatus='post'
  this.items.push({Othresid:this.Othersid,Organization:'',Description:'',Amount:''})
  let postUrl=`http://localhost:3000/other/data/post/${this.Othersid}/''/''/0/1`
  this.$axios.post(postUrl).then(result=>{
  console.log(result)
  })
  .catch(err=>{
  console.log(err)
  });
  },

  /* delete the selecetd item  decreases count so that the new insertion will be editable and othersid so that the new insertion gets id relative to previous id */

  deleteitem(item){
   this.count=this.count-1
   this.Othersid=this.Othersid-1
   const index = this.items.indexOf(item)
   const delIndex=this.items[index].Othresid
   this.items.splice(index, 1)
   this.Sum=this.Sum-item.Amount
   this.$emit('Subtotal',{total:this.Sum})

   let deleteUrl=`http://localhost:3000/other/data/delete/${delIndex}`

   this.$axios.delete(deleteUrl).then(result=>{
   console.log(result)
   this.snackbar=true
   this.snackbarText='deleted'
   this.snackColor='red'
   })
   .catch(err=>{
   console.log(err)
  });
  },

  /* after pressing tab or enter in amount coloumn the amount will be saved if submitstatus is post or edited if submitstatus is edit */ 

  save(e,amount,item){
  if(e.keyCode === 13 || e.keyCode== 9){
  const index=this.items.indexOf(item)
  this.items[index].Description=this.Description
  this.items[index].Organization=this.Organization
  this.items[index].Amount=this.Amount
  this.Amountedit=false
  this.Organizationedit=false
  this.Descriptionedit=false
    if(this.Amount==''){
   console.log(amount)
   if(amount==''){
   this.Sum=this.Sum+0
   this.$emit('Subtotal',{total:this.Sum})
      }
    else{
    this.Sum=this.Sum-amount
      this.Sum=this.Sum+0
      this.$emit('Subtotal',{total:this.Sum})
    }
  }
  else{
      this.Sum=this.Sum-amount
      this.Sum=this.Sum+parseInt(this.Amount)
      this.$emit('Subtotal',{total:this.Sum})
  }
  if(this.submitStatus==='post'){
  let editUrl=`http://localhost:3000/other/data/update/all/${this.Othersid}/${this.Organization}/${this.Description}/${this.Amount}/1`
   this.$axios.put(editUrl).then(result=>{
  console.log(result)
  this.snackbar=true
  this.snackbarText='saved'
  this.snackColor='green'
  })
  .catch(err=>{
  console.log(err)
  });
  }
  if(this.submitStatus==='edit'){
  let editIndex=this.items[this.editindex].Othresid
  console.log(editIndex)
   let editUrl=`http://localhost:3000/other/data/update/all/${editIndex}/${this.Organization}/${this.Description}/${this.Amount}/1`
   this.$axios.put(editUrl).then(result=>{
  console.log(result)
  this.snackbar=true
  this.snackbarText='edited'
  this.snackColor='purple'
   })
   .catch(err=>{
   console.log(err)
   });
  }
  this.Organization=''
  this.Description=''
  this.Amount=''
  }
  }
  },

/* fetching Soscontributions  and othercontributions  */

created(){
this.$axios.get('http://localhost:3000/sos/data').then(results=>{
console.log(results.data.result.length)
if(results.data.result.length==0){
  this.$axios.post('http://localhost:3000/sos/data/post/1/0').then(results=>{
  console.log(results)
  this.$emit('sosContibution',{sosMoney:0})
  })
  this.count=-1
  this.Othersid=-1
}
else{
  this.count=results.data.result[0].Othercontributions.length-1
  this.Othersid=results.data.result[0].Othercontributions.length-1
  let sum=0

  console.log(results.data.result[0].Amount)

  this.$emit('sosContibution',{sosMoney:results.data.result[0].Amount})

  for(var i=0 ;i<results.data.result[0].Othercontributions.length;i++){
  this.items.push(results.data.result[0].Othercontributions[i])
  sum=sum+results.data.result[0].Othercontributions[i].Amount
  }

  this.Sum=sum
  this.$emit('Subtotal',{total:this.Sum})
}
})
.catch(err=>{
  console.log(err)
})
}
}

</script>

<style scooped>
.editable{
border-bottom:1px solid blue;
}
.noteditable{
  
}
#edit{
  margin-left:30px;
}
.text-field{
  border-bottom:1px solid blue;
}
#top-div{
  padding-left:0px;
  padding-right:0px;
}
.top-div{
  height:50px;
  background-color:grey;
}
#add1{
position:absolute;
left:85%;
margin-top:5px;
}
.elevation-1{
}
.btn{
position:absolute;
left:60%;
}
#footer{
  border-top:1px solid black;
}
#Oi{
  border-bottom: 2px solid red;
}
.td{
  width:150px;
}
@media only screen and (min-width: 1024px) {
#add1{
position:absolute;
left:85%;
margin-top:5px;
}
  
}
@media only screen and (min-width: 1299px) {
#add1{
position:absolute;
left:89%;
margin-top:5px;
}
  
}
@media only screen and (min-width: 1440px) {
#add1{
position:absolute;
left:85%;
margin-top:5px;
}
}
@media only screen and (min-width: 2560px) {
#add1{
position:absolute;
left:81%;
margin-top:5px;
}
}
</style>