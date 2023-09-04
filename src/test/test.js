const treeData =  [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }]
  function findAncestorsById(tree, label) {
    tree.forEach(item => {
        // console.log(item.label)
        if(label == item.label) {
            console.log(item.label)
        }
        if(item.children) {
           const id = findAncestorsById(item.children,label)
            if(id == label) {
                // console.log(id)
            }
        }
    })
    // for (const node of tree) {
    //   if (node.label === label) {
    //     result.push(label);
    //     return result;
    //   }
    //   if (node.children.length) {
    //     const temp = findAncestorsById(node.children, label, result);
    //     if (temp) {
    //       result.push(node.label);
    //       return result;
    //     }
    //   }
    // }
    // return null;
  }
  let label = '三级 3-2-1'
  const result = findAncestorsById(treeData,label)
  console.log(result);