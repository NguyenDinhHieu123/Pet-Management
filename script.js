"use strict";
const inputID = document.getElementById("input-id");
const inputName = document.getElementById("input-name");
const inputAge = document.getElementById("input-age");
const inputType = document.getElementById("input-type");
const inputWeight = document.getElementById("input-weight");
const inputLength = document.getElementById("input-length");
const inputColor = document.getElementById("input-color-1");
const inputBreed = document.getElementById("input-breed");
const checkVaccinated = document.getElementById("input-vaccinated");
const checkDewormed = document.getElementById("input-dewormed");
const checkSterilized = document.getElementById("input-sterilized");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const btnHealthyPet = document.getElementById('healthy-btn');
const btnCalcBMI = document.getElementById('calcBMI-btn');
const petArr = [];

//  const data1 = {
//   id:'P004',
//   name:'Bob',
//   age:12,
//   type:'Dog',
//   weight:12,
//   Length:12,
//   color:'black',
//   vaccinated:true,
//   sterilized:true,
//   dewormed:true,
//   breed:'Tabby',
//   date: new Date(2024,2,1),

// }
// const data2 = {
//   id:'P005',
//   name:'Boby',
//   age:13,
//   type:'Dog',
//   weight:13,
//   Length:13,
//   color:'black',
//   vaccinated:false,
//   sterilized:false,
//   dewormed:false,
//   breed:'Tobby',
//   date: new Date(2024,2,2),

// }
// petArr.push(data1);
// petArr.push(data2);

btnSubmit.addEventListener("click", function () {
  // 1.Lấy dữ liệu từ input
  const data = {
    id: inputID.value,
    name: inputName.value,
    age: parseInt(inputAge.value),
    type: inputType.value,
    weight: parseInt(inputWeight.value),
    Length: parseInt(inputLength.value),
    color: inputColor.value,
    breed: inputBreed.value,
    vaccinated: checkVaccinated.checked,
    sterilized: checkSterilized.checked,
    dewormed: checkDewormed.checked,
    date:new Date(),
    bmi:'?'
  };
  
  //2. Validate dữ liệu
  
  // Nếu phù hợp thực hiện 3,4,5
  const validate = validateData(data);
  if (validate) {
    //3.Thêm thú cưng vào danh sách
    petArr.push(data);
    // 4.Hiển thị danh sách thú cưng
    renderTableData(petArr);
    // 5.Xóa các dữ liệu vừa nhập trên Form
        clearInput();
  }
});

// Nếu không, thông báo lỗi
function validateData (data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Không được để trống trường ID");
    isValidate = false;
  }
  if (data.name.trim() === "") {
    alert("Không được để trống trường Name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Không được để trống trường Age");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Không được để trống trường Weight");
    isValidate = false;
  }
  if (isNaN(data.Length)) {
    alert("Không được để trống trường Length ");
    isValidate = false;
  }

  // Kiểm tra ID có phải là duy nhất không ?
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique !");
      isValidate = false;
      break;
    }
  }
  // Kiểm tra tuổi
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra cân nặng
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  // Kiểm tra chiều cao
  if (data.Length < 1 || data.Length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }
  // Kiểm tra select breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed");
    isValidate = false;
  }
  // Kiểm tra selct Type
  if (data.type === "Select Type") {
    alert("Please select Type");
    isValidate = false;
  }
  
  return isValidate;
} 


//4. Hàm hiển thị danh sách thú cưng
function renderTableData(petArr){
  tableBodyEl.innerHTML = '';
  for(let i = 0;i< petArr.length;i++){
  const row = document.createElement('tr');
row.innerHTML = 
`
<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].Length} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color:${petArr[i].color}"></i>
</td>
<td><i class="bi ${petArr[i].vaccinated ? 'bi-check-circle-fill' :'bi-x-circle-fill' }"></i></td>
<td><i class="bi ${petArr[i].dewormed ? 'bi-check-circle-fill' :'bi-x-circle-fill' }"></i></td>
<td><i class="bi ${petArr[i].sterilized ? 'bi-check-circle-fill' :'bi-x-circle-fill' }"></i></td>
<td>${petArr[i].bmi}</td>
<td>${petArr[i].date.getDate()}/${petArr[i].date.getMonth()+1 }/${petArr[i].date.getFullYear()}</td>
<td>
<button class="btn btn-danger"  onclick= "DeletePet('${ petArr[i].id }') ">Delete</button>
</td>
`;
tableBodyEl.appendChild(row);
}
};

//5. Xóa dự liệu vừa nhập form
function clearInput(){
  inputID.value= '';
  inputName.value = '';
  inputAge.value= '';
  inputLength.value= '';
  inputWeight.value= '';
  inputColor.value= '#000000';
  inputType.value= "Select Type";
  inputBreed.value= "Select Breed";
  checkVaccinated.checked= false;
  checkDewormed.checked= false;
  checkSterilized.checked= false;
}

// 6.Xóa một thú cưng
function DeletePet(petId){
  const isDeleted = confirm('Are you sure');
  if(isDeleted){
    // thực hiện xóa
    for(let i = 0 ;i<petArr.length;i++){
      if(petId === petArr[i].id ){
        // Xóa pet khỏi mảng
        petArr.splice(i,1);
        renderTableData(petArr);
      }
    }
  }
};


// 7.Hiển thị các thú cưng khỏe mạnh
let healthyCheck = true;

btnHealthyPet.addEventListener('click',function(){
  // Hiển thị các thú cưng khỏe mạnh
  if(healthyCheck === true){
    // Mảng Hiển thị thú cưng khỏe mạnh
    const healthyPetArr =[];
    // lọc trong mảng
    for(let i =0 ;i<petArr.length;i++){
      if(petArr[i].vaccinated&&petArr[i].dewormed&&petArr[i].sterilized){
        // thêm thú cưng vào mảng
        healthyPetArr.push(petArr[i]);
      }
    }
    // mảng healthyPetArr sẽ chứa các thú cưng khỏe mạnh

    // gọi hàm hiển thị thú cưng khỏe mạnh
    renderTableData(healthyPetArr);
    // đổi nút Show Healthy Pet thành Show All Pet
    btnHealthyPet.textContent = 'Show All Pet';
    // đổi lại biến cờ hiệu
    healthyCheck =false;
  }
  else{
    // hiển thị toàn bộ thú cưng
  renderTableData(petArr);
    // đổi lại tên nút
    btnHealthyPet.textContent = 'Show Healthy Pet';
    healthyCheck = true;
  }
});



//8.Tính toán chỉ số BMI
btnCalcBMI.addEventListener('click',function(){
  for(let i = 0 ;i < petArr.length ;i++){
    petArr[i].bmi = petArr[i].type === "Dog" ? ((petArr[i].weight * 703) / petArr[i].Length ** 2).toFixed(2) : ((petArr[i].weight * 886) / petArr[i].Length ** 2).toFixed(2);
  }
  renderTableData(petArr);
});