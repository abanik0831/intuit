import request from 'request-promise'


export async function createBill() {
  const options = { method: 'POST',
    url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/123145906005864/bill',
    headers:
      { 'postman-token': 'd3832331-7333-d051-15ab-ca09dca0ee1c',
        'cache-control': 'no-cache',
        'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0MHkoIM7i7XBjATh-cf9Jw.nFeS9RrZ6e4MoVL2rfOwICbDjXhiH43Mbu7Riqp8a-TIwlL1nSE0VH-caTYSQDsrtHFIw912NF0Y-zMxzq7eYaYaHtvA9mNOgeaymOvKKpAWAcRpOjIY1U6Cm-fJDKxaBeGQacD9r7nDBTjjoPpPnReaDHz_hflWmrECKaI0LlVfxhNy8Kf8dftHZym8QSUBxUXwYzEguZUXL2x_8MG2GfYvjLF6IN6b83S_yRvahRdKTx93hf0tijepUn0317GJVFd_vgshrYdXoN6h4jV6f0-zqfgKuir2pVasCAcHmrnLfoknVaucYMRCZllAYAZBVlbn8woz0GRpQzUjQPPXcNYV-1rN36xO441OOZymy7Z2_GacYELqVJUD9citsSTuiXIBgoQwFuyNxSmFBIXg1gOPNYMytqjX8bxwzsaNsL0yROl1pRJw_Yd-bb-J5ABYYt2bhuRWI66yFiNBPsPW95BREfaXMqLd7DCzlgoJM2oWRHpgaM8sCyg0cY_JFGKIIi_coeBLfe6TmyJICjFUhrpopBGzHiGgDSP49zBR8sVLSmDgGIui5A7VEes3mH0zt0P9Ya-EM5BVIM4h8MGBaSQHgzIWpxsx-9AtePvkj5WnjJzt14s2Ddl_qj1zhBkNBrU3lYlwOnwGv1UNiaEykJuTkg_EYpdT96KnPPMggAnrb-af9RHcaHuVSQ7DYDMq4EFDOUFQgYXjGA1VU6pf1KMlaikyBvLEGTWQvEYBY5Cdv8j2S72PH_VsEeaaVB1vQlsjRnxZoM3xCV1Jyx-tympmWcsNf7OH5BWveBqqtqg.fUJVofy1eeblqLZHrO7Jrw',
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'Intuit-qbov3-postman-collection1' },
    body:
      { Line:
        [ { Id: '1',
          Amount: 360,
          DetailType: 'AccountBasedExpenseLineDetail',
          AccountBasedExpenseLineDetail: { AccountRef: { value: '7' } } } ],
        VendorRef: { value: '31' } },
    json: true
  }
  
  return request(options)
}

export async function readBillDue() {
  var options = { method: 'POST',
    url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/123145906005864/query',
    headers:
      { 'postman-token': '55c16528-bd7b-9c54-41f7-bc3762386287',
        'cache-control': 'no-cache',
        'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0MHkoIM7i7XBjATh-cf9Jw.nFeS9RrZ6e4MoVL2rfOwICbDjXhiH43Mbu7Riqp8a-TIwlL1nSE0VH-caTYSQDsrtHFIw912NF0Y-zMxzq7eYaYaHtvA9mNOgeaymOvKKpAWAcRpOjIY1U6Cm-fJDKxaBeGQacD9r7nDBTjjoPpPnReaDHz_hflWmrECKaI0LlVfxhNy8Kf8dftHZym8QSUBxUXwYzEguZUXL2x_8MG2GfYvjLF6IN6b83S_yRvahRdKTx93hf0tijepUn0317GJVFd_vgshrYdXoN6h4jV6f0-zqfgKuir2pVasCAcHmrnLfoknVaucYMRCZllAYAZBVlbn8woz0GRpQzUjQPPXcNYV-1rN36xO441OOZymy7Z2_GacYELqVJUD9citsSTuiXIBgoQwFuyNxSmFBIXg1gOPNYMytqjX8bxwzsaNsL0yROl1pRJw_Yd-bb-J5ABYYt2bhuRWI66yFiNBPsPW95BREfaXMqLd7DCzlgoJM2oWRHpgaM8sCyg0cY_JFGKIIi_coeBLfe6TmyJICjFUhrpopBGzHiGgDSP49zBR8sVLSmDgGIui5A7VEes3mH0zt0P9Ya-EM5BVIM4h8MGBaSQHgzIWpxsx-9AtePvkj5WnjJzt14s2Ddl_qj1zhBkNBrU3lYlwOnwGv1UNiaEykJuTkg_EYpdT96KnPPMggAnrb-af9RHcaHuVSQ7DYDMq4EFDOUFQgYXjGA1VU6pf1KMlaikyBvLEGTWQvEYBY5Cdv8j2S72PH_VsEeaaVB1vQlsjRnxZoM3xCV1Jyx-tympmWcsNf7OH5BWveBqqtqg.fUJVofy1eeblqLZHrO7Jrw',
        'content-type': 'application/text',
        accept: 'application/json',
        'user-agent': 'Intuit-qbov3-postman-collection1' },
    body: 'Select * from Bill startposition 1 maxresults 5' };
  
  const body = await request(options)
  
  return JSON.parse(body).QueryResponse.Bill[0].Id
}

export async function makePayment(id) {
  const options = { method: 'POST',
    url: 'https://sandbox-quickbooks.api.intuit.com/v3/company/123145906005864/billpayment',
    headers:
      { 'postman-token': '8ac182e3-d8c8-7b2d-5f91-ff81fd12f11c',
        'cache-control': 'no-cache',
        'authorization': 'Bearer eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..0MHkoIM7i7XBjATh-cf9Jw.nFeS9RrZ6e4MoVL2rfOwICbDjXhiH43Mbu7Riqp8a-TIwlL1nSE0VH-caTYSQDsrtHFIw912NF0Y-zMxzq7eYaYaHtvA9mNOgeaymOvKKpAWAcRpOjIY1U6Cm-fJDKxaBeGQacD9r7nDBTjjoPpPnReaDHz_hflWmrECKaI0LlVfxhNy8Kf8dftHZym8QSUBxUXwYzEguZUXL2x_8MG2GfYvjLF6IN6b83S_yRvahRdKTx93hf0tijepUn0317GJVFd_vgshrYdXoN6h4jV6f0-zqfgKuir2pVasCAcHmrnLfoknVaucYMRCZllAYAZBVlbn8woz0GRpQzUjQPPXcNYV-1rN36xO441OOZymy7Z2_GacYELqVJUD9citsSTuiXIBgoQwFuyNxSmFBIXg1gOPNYMytqjX8bxwzsaNsL0yROl1pRJw_Yd-bb-J5ABYYt2bhuRWI66yFiNBPsPW95BREfaXMqLd7DCzlgoJM2oWRHpgaM8sCyg0cY_JFGKIIi_coeBLfe6TmyJICjFUhrpopBGzHiGgDSP49zBR8sVLSmDgGIui5A7VEes3mH0zt0P9Ya-EM5BVIM4h8MGBaSQHgzIWpxsx-9AtePvkj5WnjJzt14s2Ddl_qj1zhBkNBrU3lYlwOnwGv1UNiaEykJuTkg_EYpdT96KnPPMggAnrb-af9RHcaHuVSQ7DYDMq4EFDOUFQgYXjGA1VU6pf1KMlaikyBvLEGTWQvEYBY5Cdv8j2S72PH_VsEeaaVB1vQlsjRnxZoM3xCV1Jyx-tympmWcsNf7OH5BWveBqqtqg.fUJVofy1eeblqLZHrO7Jrw',
        'content-type': 'application/json',
        accept: 'application/json',
        'user-agent': 'Intuit-qbov3-postman-collection1' },
    body:
      { VendorRef: { value: '31', name: 'Test' },
        PayType: 'Check',
        CheckPayment: { BankAccountRef: { value: '35', name: 'Checking' } },
        TotalAmt: 360,
        PrivateNote: 'Acct. 1JK90',
        Line:
          [ { Amount: 360,
            LinkedTxn: [ { TxnId: id, TxnType: 'Bill' } ] } ] },
    json: true };
  
  const moveMoney = await request(options)
  
  return moveMoney
  
}