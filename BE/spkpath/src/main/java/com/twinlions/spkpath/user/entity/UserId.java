package com.twinlions.spkpath.user.entity;

import java.io.Serializable;

public class UserId implements Serializable {
    private static final long serialVersionUID = -2929789292155268166L;

    private String userId;

    public UserId(){}

    public UserId(String userId){
        this.userId = userId;
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }
}
