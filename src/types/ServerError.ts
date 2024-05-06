// {
//     "errors": [
//       {
//         "code": "INTERNAL_SERVER_ERROR",
//         "field": "",
//         "message": "Database not found!"
//       }
//     ]
//   }

export type ServerError = {
  code: string;
  field: string;
  message: string;
};
