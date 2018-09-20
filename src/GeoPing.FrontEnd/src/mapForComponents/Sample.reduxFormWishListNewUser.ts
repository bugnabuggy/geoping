export const componentFormMap: Array<any> = [
  {
    name: 'user_name',
    placeholder: 'Enter Name',
    labelName: 'Name *',
    type: 'input',
  },
  {
    name: 'user_second_name',
    placeholder: 'Enter Second Name',
    labelName: 'Second Name *',
    type: 'input',
  },
  {
    name: 'user_age',
    placeholder: 'Enter Age',
    labelName: 'Age',
    type: 'input',
  },
  {
    name: 'user_address',
    placeholder: 'Enter Address',
    labelName: 'Address',
    type: 'input',
  },
  {
    name: 'user_phone',
    placeholder: 'Phone',
    labelName: 'Enter Phone',
    type: 'input',
  },
  {
    name: 'specialty_list_Id',
    labelName: 'Select',
    componentClass: 'select',
    type: 'select',
    list: [
      {
        specialty: 'vis',
        id: 1,
      },
      {
        specialty: 'tik',
        id: 2,
      }
    ],
  }
];