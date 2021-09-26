// var treeData =  [
// 	{
// 	  code: '0',
// 	  title: '0',
// 	  parentCode: '-1',
// 	  expand: true,
// 	  selected: null,
// 	  checked: false,
// 	  loading: null,
// 	  children: [
// 		{
// 		  code: '1',
// 		  title: '县公安局',
// 		  parentCode: '0',
// 		  expand: false,
// 		  selected: null,
// 		  checked: false,
// 		  loading: null,
// 		  children: [
// 			{
// 			  code: '2',
// 			  title: '刑侦大队',
// 			  parentCode: '1',
// 			  expand: false,
// 			  selected: null,
// 			  checked: false,
// 			  loading: null,
// 			  children: [
// 				{
// 				  code: '4',
// 				  title: '司法',
// 				  parentCode: '2',
// 				  expand: false,
// 				  selected: null,
// 				  checked: false,
// 				  loading: null,
// 				  children: [
// 					{
// 					  code: '6',
// 					  title: '王五',
// 					  parentCode: '4',
// 					  expand: false,
// 					  selected: null,
// 					  checked: false,
// 					  loading: null,
// 					  children: null,
// 					  disabled: null,
// 					  disableCheckbox: null
// 					},
// 					{
// 					  code: '7',
// 					  title: '李四',
// 					  parentCode: '4',
// 					  expand: false,
// 					  selected: null,
// 					  checked: false,
// 					  loading: null,
// 					  children: null,
// 					  disabled: null,
// 					  disableCheckbox: null
// 					}
// 				  ],
// 				  disabled: null,
// 				  disableCheckbox: null
// 				},
// 				{
// 				  code: '5',
// 				  title: '民政',
// 				  parentCode: '2',
// 				  expand: false,
// 				  selected: null,
// 				  checked: false,
// 				  loading: null,
// 				  children: [
// 					{
// 					  code: '4',
// 					  title: '王亮',
// 					  parentCode: '5',
// 					  expand: false,
// 					  selected: null,
// 					  checked: false,
// 					  loading: null,
// 					  children: null,
// 					  disabled: null,
// 					  disableCheckbox: null
// 					},
// 					{
// 					  code: '5',
// 					  title: '崇仁县',
// 					  parentCode: '5',
// 					  expand: false,
// 					  selected: null,
// 					  checked: true,
// 					  loading: null,
// 					  children: null,
// 					  disabled: null,
// 					  disableCheckbox: null
// 					}
// 				  ],
// 				  disabled: null,
// 				  disableCheckbox: null
// 				}
// 			  ],
// 			  disabled: null,
// 			  disableCheckbox: null
// 			}
// 		  ],
// 		  disabled: null,
// 		  disableCheckbox: null
// 		},
// 		{
// 		  code: '3',
// 		  title: '政法',
// 		  parentCode: '0',
// 		  expand: false,
// 		  selected: null,
// 		  checked: false,
// 		  loading: null,
// 		  children: [
// 			{
// 			  code: '123',
// 			  title: '张新',
// 			  parentCode: '3',
// 			  expand: false,
// 			  selected: null,
// 			  checked: false,
// 			  loading: null,
// 			  children: null,
// 			  disabled: null,
// 			  disableCheckbox: null
// 			},
// 			{
// 			  code: '2',
// 			  title: '李新',
// 			  parentCode: '3',
// 			  expand: false,
// 			  selected: null,
// 			  checked: false,
// 			  loading: null,
// 			  children: null,
// 			  disabled: null,
// 			  disableCheckbox: null
// 			},
// 			{
// 			  code: '3',
// 			  title: '张天阳',
// 			  parentCode: '3',
// 			  expand: false,
// 			  selected: null,
// 			  checked: false,
// 			  loading: null,
// 			  children: null,
// 			  disabled: null,
// 			  disableCheckbox: null
// 			}
// 		  ],
// 		  disabled: null,
// 		  disableCheckbox: null
// 		}
// 	  ],
// 	  disabled: null,
// 	  disableCheckbox: null
// 	}
//   ]
// var addId = function (arr) {
// 	let a = 'array'
//     if (typeof arr == 'object' || typeof arr == a) {
//         var result = [];
//         arr.forEach(element => {
//             if (element.children) {
//                 addId(element.children);
//             }
// 			if(!!element.checked) {
// 				result.push(element.code);
// 			}
//         });
// 		console.log(result);
// 		return result
// }
// }
// console.log(addId(treeData));


function recursionGetPathByKey(curKey, data, keyName = "index", childrenName = "children") {
    let result = [];
    // 记录路径结果  
    let traverse = (curKey, path, data) => {
        if (data.length === 0) {
            return;
        }
        for (let item of data) {
            path.push(item);
            if (item[keyName] === curKey) {
                result = JSON.parse(JSON.stringify(path));
                return;
            }
            const children = Array.isArray(item.children) ?
                item[childrenName] : [];
            traverse(curKey, path, children); // 遍历
            path.pop(); // 回溯
        }
    };
    traverse(curKey, [], data);
    return result;
};
var treeData = [
    {
        code: '0',
        title: '0',
        parentCode: '-1',
        expand: true,
        selected: null,
        checked: null,
        loading: null,
        children: [
            {
                code: '1',
                title: '县公安局',
                parentCode: '0',
                expand: false,
                selected: null,
                checked: null,
                loading: null,
                children: [
                    {
                        code: '2',
                        title: '刑侦大队',
                        parentCode: '1',
                        expand: false,
                        selected: null,
                        checked: null,
                        loading: null,
                        children: [
                            {
                                code: '4',
                                title: '司法',
                                parentCode: '2',
                                expand: false,
                                selected: null,
                                checked: null,
                                loading: null,
                                children: [
                                    {
                                        code: '6',
                                        title: '王五',
                                        parentCode: '4',
                                        expand: false,
                                        selected: null,
                                        checked: null,
                                        loading: null,
                                        children: null,
                                        disabled: null,
                                        disableCheckbox: null
                                    },
                                    {
                                        code: '7',
                                        title: '李四',
                                        parentCode: '4',
                                        expand: false,
                                        selected: null,
                                        checked: null,
                                        loading: null,
                                        children: null,
                                        disabled: null,
                                        disableCheckbox: null
                                    }
                                ],
                                disabled: null,
                                disableCheckbox: null
                            },
                            {
                                code: '5',
                                title: '民政',
                                parentCode: '2',
                                expand: false,
                                selected: null,
                                checked: null,
                                loading: null,
                                children: [
                                    {
                                        code: '4',
                                        title: '王亮',
                                        parentCode: '5',
                                        expand: false,
                                        selected: null,
                                        checked: null,
                                        loading: null,
                                        children: null,
                                        disabled: null,
                                        disableCheckbox: null
                                    },
                                    {
                                        code: '5',
                                        title: '崇仁县',
                                        parentCode: '5',
                                        expand: false,
                                        selected: null,
                                        checked: true,
                                        loading: null,
                                        children: null,
                                        disabled: null,
                                        disableCheckbox: null
                                    }
                                ],
                                disabled: null,
                                disableCheckbox: null
                            }
                        ],
                        disabled: null,
                        disableCheckbox: null
                    }
                ],
                disabled: null,
                disableCheckbox: null
            },
            {
                code: '3',
                title: '政法',
                parentCode: '0',
                expand: false,
                selected: null,
                checked: null,
                loading: null,
                children: [
                    {
                        code: '123',
                        title: '张新',
                        parentCode: '3',
                        expand: false,
                        selected: null,
                        checked: null,
                        loading: null,
                        children: null,
                        disabled: null,
                        disableCheckbox: null
                    },
                    {
                        code: '2',
                        title: '李新',
                        parentCode: '3',
                        expand: false,
                        selected: null,
                        checked: null,
                        loading: null,
                        children: null,
                        disabled: null,
                        disableCheckbox: null
                    },
                    {
                        code: '3',
                        title: '张天阳',
                        parentCode: '3',
                        expand: false,
                        selected: null,
                        checked: null,
                        loading: null,
                        children: null,
                        disabled: null,
                        disableCheckbox: null
                    }
                ],
                disabled: null,
                disableCheckbox: null
            }
        ],
        disabled: null,
        disableCheckbox: null
    }
]
console.log(recursionGetPathByKey(true, treeData, 'expand', 'children').filter(x => x.expand == true).map(x => x.code))
