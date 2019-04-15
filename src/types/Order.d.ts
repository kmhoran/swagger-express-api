interface Order {
    id: number;
    petId: number;
    quantity: number;
    shipDate: string;
    complete: boolean;
}


// "Order": {
//     "type": "object",
//     "properties": {
//       "id": {
//         "type": "integer",
//         "format": "int64"
//       },
//       "petId": {
//         "type": "integer",
//         "format": "int64"
//       },
//       "quantity": {
//         "type": "integer",
//         "format": "int32"
//       },
//       "shipDate": {
//         "type": "string",
//         "format": "date-time"
//       },
//       "status": {
//         "type": "string",
//         "description": "Order Status",
//         "enum": [
//           "placed",
//           "approved",
//           "delivered"
//         ]
//       },
//       "complete": {
//         "type": "boolean",
//         "default": false
//       }
//     },
//     "xml": {
//       "name": "Order"
//     }
//   },