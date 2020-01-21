export function mapcount(combinedData, gridData, filterType) {
    if(combinedData.length > 0) {
        combinedData.forEach(dataElement => {
            gridData.forEach(gridElement => {
                if(dataElement.Context[0] === gridElement.context) {
                    gridElement.objects.push(dataElement)
                    gridElement.count += 1;
                }
            })
        });
    }
    return gridData
}